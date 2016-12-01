# -*- coding: utf-8 -*-
import xlrd
import json


def products_from_xls(filename):
    # try:
    rb = xlrd.open_workbook(filename=filename)
    sheet = rb.sheet_by_index(0)
    result = list()
    colNames = list()
    for col in range(1, 9):
        colNames.append(sheet.row_values(4)[col])
        # print sheet.row_values(4)[col]
    years = list()
    companies = list()
    data = dict()
    monthes = [u"янв", u"фев", u"мар", u"апр", u"май", u"июн", u"июл", u"авг", u"сен", u"окт", u"ноя", u"дек"]
    for rownum in range(sheet.nrows):
        if rownum > 4:
            # data starts from 5th row in XLSX
            current_company = u"Компания 1"
            #  current_company = sheet.row_values(rownum)[1]
            current_month = sheet.row_values(rownum)[3]
            if current_company not in companies:
                companies.append(current_company) # TEST ONLY

            current_year = int(sheet.row_values(rownum)[2])
            if current_year not in years:
                years.append(int(current_year))

            if current_company not in data:
                data[current_company] = dict()
            if current_year not in data[current_company]:
                data[current_company][current_year] = dict()
                for m in monthes:
                    if m not in data[current_company][current_year]:
                        data[current_company][current_year][m] = 5 * [0.0]
            for col in range(4, 9):
                value = sheet.row_values(rownum)[col]
                try:
                    value = float(value)
                except:
                    value = None
                if col == 8 and value is not None:
                    value *= 100.0
                data[current_company][current_year][current_month][col - 4] = value
    # for c in companies:
    #     print c
    # print ' ------- '
    # for d in years:
    #     print d
    # for k, v in data.iteritems():
    #     print k
    #     for y, monthes in v.iteritems():
    #         print "  " + str(y)
    #         # print monthes
    #         for m, vals in monthes.iteritems():
    #             print u"    {} - {}".format(m, vals)
    # # print data
    with open('../www/nalogy_data.json', 'w+') as f:
        f.write(json.dumps(data))
    with open('../www/nalogy_years.json', 'w+') as f:
        f.write(json.dumps(years))
    with open('../www/nalogy_companies.json', 'w+') as f:
        f.write(json.dumps(companies))
    with open('../www/nalogy_monthes.json', 'w+') as f:
        f.write(json.dumps(monthes))
    return data
    # except:
    #     pass
    # return None

if __name__ == "__main__":
    products_from_xls("nalogy.xlsx")
