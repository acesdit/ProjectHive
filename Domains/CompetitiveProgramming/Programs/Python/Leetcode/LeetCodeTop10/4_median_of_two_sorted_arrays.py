
class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        nums = sorted(nums1 + nums2)
        n = len(nums)
        if n % 2 == 1:
            return nums[n // 2]
        return (nums[n // 2 - 1] + nums[n // 2]) / 2

if __name__ == "__main__":
    print(Solution().findMedianSortedArrays([1,3], [2]))
