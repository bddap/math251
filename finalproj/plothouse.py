
# import matplotlib.pyplot as plt
#
#
# def lc(fn='HPI_master.csv'):
#     return [line.strip('\r\n').strip(',').split(',') for line in open(fn) if line][1:]
#
# d = lc()
#
# (hpi_type, hpi_flavor, frequency, level, place_name, place_id, yr, period,
#  index_nsa, index_sa) = range(10)
#
# # print([float(line[yr]) for line in d])
# for l in d:
#     print(len(l))
#


import csv
import matplotlib.pyplot as plt

d = list(csv.reader(open('HPI_master.csv'), quoting=csv.QUOTE_MINIMAL))[1:-1]
d = [line for line in d if all(line)]

(
    hpi_type, hpi_flavor, frequency, level, place_name, place_id, yr, period,
    index_nsa, index_sa
) = range(10)

d = [line for line in d if line[place_id] == "OR"]
purchaseOnly = [l for l in d if l[hpi_flavor] == 'purchase-only']
expandedData = [l for l in d if l[hpi_flavor] == 'expanded-data']

plt.plot(
    [float(line[yr]) for line in purchaseOnly],
    [float(line[index_sa]) for line in purchaseOnly]
)
plt.show()
