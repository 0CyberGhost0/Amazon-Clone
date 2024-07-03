class Solution {
public:
    int getReward(int curr,int reward,vector<int>& nums,vector<unordered_map<int,int>> &dp){
        if(curr==nums.size()) return 0;
        if(dp[curr].find(reward)!=dp[curr].end()) return dp[curr][reward];
        int ans=0;
        if(nums[curr]>reward){
            ans=nums[curr]+getReward(curr+1,reward+nums[curr],nums,dp);
        }
        ans=max(ans,getReward(curr+1,reward,nums,dp));
        return dp[curr][reward]=ans;
    }
    int maxTotalReward(vector<int>& rewardValues) {
            sort(rewardValues.begin(),rewardValues.end());
            vector<unordered_map<int,int>> dp(rewardValues.size());
            return getReward(0,0,rewardValues,dp);
        
        
    }
};
int main() {
    Solution solution;
    vector<int> rewardValues1 = {1, 1, 3, 3};
    vector<int> rewardValues2 = {1, 6, 4, 3, 2};
    vector<int> rewardValues3 = {2, 4, 3, 10, 4, 5, 9, 5, 6, 6, 1, 3, 9, 10, 4, 4, 3, 8, 1, 10, 9, 5, 1, 4, 8};

    cout << solution.maxTotalReward(rewardValues1) << endl; // Output: 4
    cout << solution.maxTotalReward(rewardValues2) << endl; // Output: 11
    cout << solution.maxTotalReward(rewardValues3) << endl; // Expected Output: ? (We need to check what it should be)
    return 0;
}