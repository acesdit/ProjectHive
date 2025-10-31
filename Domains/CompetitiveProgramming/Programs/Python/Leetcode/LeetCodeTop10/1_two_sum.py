
class Solution:
    def twoSum(self, nums, target):
        hashmap = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in hashmap:
                return [hashmap[diff], i]
            hashmap[num] = i

# Example
if __name__ == "__main__":
    print(Solution().twoSum([2, 7, 11, 15], 9))
