for(i = 0; i < nums.length; i += step) { // 错误1：循环条件
    step = nums[i];                      // 错误2：强制最大跳跃
    i += step;                           // 错误3：双重增加索引
}
