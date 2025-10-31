
class Solution:
    def longestPalindrome(self, s):
        res = ""
        for i in range(len(s)):
            res = max(res, self.expand(s, i, i), self.expand(s, i, i+1), key=len)
        return res

    def expand(self, s, l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l+1:r]

if __name__ == "__main__":
    print(Solution().longestPalindrome("babad"))
