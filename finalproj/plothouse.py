#!/usr/bin/env python3


import csv
import matplotlib.pyplot as plt


def ds(hpi = ('traditional', 'expanded-data')):
    d = list(csv.DictReader(open('HPI_master.csv'), quoting=csv.QUOTE_MINIMAL))

    # only oregon
    d = [l for l in d if l['place_id'] == 'OR']

    d = [l for l in d if (l['hpi_type'], l['hpi_flavor']) == hpi]

    for l in d:
        # all our data is state level now
        del l['level']
        # all our frequencies are quarterly
        del l['frequency']
        # place_name and place_id are always Oregon and OR
        del l['place_name']
        del l['place_id']
        # hpi_type and hpi_flavor are always traditional all-transactions
        del l['hpi_type']
        del l['hpi_flavor']

        # use only one axis for time
        l['yr'] = float(l['yr']) + (float(l['period']) - 1) / 4
        del l['period']

        # index_sa is not always defined
        del l['index_sa']

    return (
        [float(l['yr']) for l in d],
        [float(l['index_nsa']) for l in d]
    )

if __name__ == '__main__':
    d = ds()
    plt.plot(*d, label="Housing prices in Oregon.")
    plt.legend()
    plt.show()
