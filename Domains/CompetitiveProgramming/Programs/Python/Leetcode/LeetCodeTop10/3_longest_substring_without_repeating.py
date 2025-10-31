
class Solution:
    def lengthOfLongestSubstring(self, s):
        seen = {}
        left = 0
        max_len = 0
        for right, ch in enumerate(s):
            if ch in seen and seen[ch] >= left:
                left = seen[ch] + 1
            seen[ch] = right
            max_len = max(max_len, right - left + 1)
        return max_len

if __name__ == "__main__":
    print(Solution().lengthOfLongestSubstring("abcabcbb"))
