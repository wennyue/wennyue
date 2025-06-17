//跳跃模拟
class Solution {
    public boolean canJump(int[] nums) {
        int i = 0;
        int maxReach = 0; // 记录能到达的最远位置
        
        while (i <= maxReach) { // 确保当前位置可达
            // 更新能到达的最远位置
            maxReach = Math.max(maxReach, i + nums[i]);
            
            // 如果能到达终点
            if (maxReach >= nums.length - 1) return true;
            
            i++; // 关键：每次只前进1步，检查每个位置
        }
        return false;
    }
}
//贪心算法
public boolean canJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;  // 当前位置不可达
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= nums.length - 1) return true;  // 提前终止
    }
    return true;
}
