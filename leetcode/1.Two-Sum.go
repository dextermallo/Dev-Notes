func twoSum(nums []int, target int) []int {
	mp := make(map[int]int)

	for idx, num := range nums {
		if _, found := mp[target-num]; found {
			return []int{idx, mp[target-num]}
		}
		mp[num] = idx
	}

	return []int{-1, -1}
}