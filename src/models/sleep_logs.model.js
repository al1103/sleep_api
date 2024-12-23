import { Model, DataTypes, Op } from 'sequelize';
import sequelize from '../config/sequelize.js';
import paginate from './plugins/pagination.js';

class Sleep_logs extends Model {
  // Tính tổng thời gian ngủ
  static async getTotalSleepDuration(start_time, end_time) {
    const start = new Date(`1970-01-01T${start_time}Z`);
    const end = new Date(`1970-01-01T${end_time}Z`);
    return (end - start) / (1000 * 60 * 60); // Thời gian ngủ tính bằng giờ
  }

  // Tìm logs theo user_id
  static async findByUserId(userId) {
    return await Sleep_logs.findAll({
      where: {
        user_id: userId,
      },
    });
  }

  // Tìm logs theo khoảng thời gian
  static async findByDateRange(startDate, endDate) {
    return await Sleep_logs.findAll({
      where: {
        sleep_date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
  }
}

// Định nghĩa bảng
Sleep_logs.init(
  {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sleep_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        is: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, // Định dạng HH:MM:SS
      },
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        is: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, // Định dạng HH:MM:SS
      },
    },
    sleep_quality: {
      type: DataTypes.SMALLINT,
      validate: {
        min: 1, // Chất lượng từ 1 đến 5
        max: 5,
      },
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Sleep_logs',
  }
);

// Hook: Trước khi tạo, validate và lưu thời lượng giấc ngủ
Sleep_logs.beforeCreate(async (sleepLog) => {
  const duration = await Sleep_logs.getTotalSleepDuration(sleepLog.start_time, sleepLog.end_time);
  if (duration <= 0) {
    throw new Error('End time must be after start time.');
  }
});

// Plugin phân trang
Sleep_logs.paginate = paginate;

export default Sleep_logs;