
class Solution:
    def reverse(self, x):
        sign = -1 if x < 0 else 1
        rev = int(str(abs(x))[::-1])
        return sign * rev if -2**31 <= sign * rev <= 2**31 - 1 else 0

if __name__ == "__main__":
    print(Solution().reverse(123))
