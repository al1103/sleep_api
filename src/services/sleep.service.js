import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import Alarm from '../models/alarm.model.js';
import Sleep_logs from '../models/sleep_logs.model.js';

class SleepService {
  constructor() {}

  async createAlarm(sleep_date,start_time,end_time,sleep_quality,) {
    Sleep_logs.getTotalSleepDuration();


  }

  

}

export default new SleepService();
