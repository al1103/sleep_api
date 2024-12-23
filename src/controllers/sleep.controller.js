import httpStatus from 'http-status';
import { ROLE_KEYS } from '../config/roles.js';
import userService from '../services/user.service.js';
import SleepLogs from '../models/sleep_logs.model.js'; // Import model Sleep_logs
import catchAsync from '../utils/catchAsync.js';

class SleepController {
  // Tạo log giấc ngủ mới
  createSleepLog = catchAsync(async (req, res) => {
    const { user_id, sleep_date, start_time, end_time, sleep_quality, notes } = req.body;

    // Kiểm tra nếu người dùng hợp lệ
    const user = await userService.getUserById(user_id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
    }

    // Tạo log giấc ngủ
    const sleepLog = await SleepLogs.create({ user_id, sleep_date, start_time, end_time, sleep_quality, notes });

    res.status(httpStatus.CREATED).json({
      message: 'Sleep log created successfully',
      data: sleepLog,
    });
  });

  // Lấy danh sách log theo user_id
  getSleepLogsByUser = catchAsync(async (req, res) => {
    const { user_id } = req.params;

    // Tìm log theo user_id
    const sleepLogs = await SleepLogs.findByUserId(user_id);
    if (sleepLogs.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'No sleep logs found for this user' });
    }

    res.status(httpStatus.OK).json({
      message: 'Sleep logs fetched successfully',
      data: sleepLogs,
    });
  });

  // Lấy log theo khoảng thời gian
  getSleepLogsByDateRange = catchAsync(async (req, res) => {
    const { start_date, end_date } = req.query;

    // Validate ngày
    if (!start_date || !end_date) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: 'Start date and end date are required' });
    }

    const sleepLogs = await SleepLogs.findByDateRange(start_date, end_date);

    res.status(httpStatus.OK).json({
      message: 'Sleep logs fetched successfully',
      data: sleepLogs,
    });
  });

  // Xóa một log giấc ngủ
  deleteSleepLog = catchAsync(async (req, res) => {
    const { id } = req.params;

    const sleepLog = await SleepLogs.findByPk(id);
    if (!sleepLog) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Sleep log not found' });
    }

    await sleepLog.destroy();
    res.status(httpStatus.OK).json({ message: 'Sleep log deleted successfully' });
  });
}

export default new SleepController();