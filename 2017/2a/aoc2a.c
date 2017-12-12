#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *input_filename = "input";

int compute_crc_line(int *elem_list, int len)
{
	int i;
	int max = 0;
	int min = 8000;

	if (!elem_list)
		return -1;

	for (i = 0; i < len; ++i) {
		if (elem_list[i] <= min)
			min = elem_list[i];
		if (elem_list[i] >= max)
			max = elem_list[i];
	}

	return (max - min);
}

int main(int argc, char **argv)
{
	int crc = 0;
	int idx;
	int elem[32];
	ssize_t read;
	size_t len = 0;
	char *line = NULL;

	FILE *input_file = fopen(input_filename, "r");

	if (!input_file) {
		printf("error: cannot open file\n");

		return -1;
	}

	while ((read = getline(&line, &len, input_file)) != -1) {
		char *match;
		idx = 0;

		while ((match = strsep(&line, "\t")) != NULL) {
			elem[idx] = atoi(match);
			idx++;
		}

		crc += compute_crc_line(elem, idx);
	}

	printf("%d\n", crc);

	return 0;
}
