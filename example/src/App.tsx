import { Text, View, StyleSheet } from 'react-native';
import StickyTable from 'react-native-dual-sticky-table';

const DATES = [
  'Mon 1',
  'Tue 2',
  'Wed 3',
  'Thu 4',
  'Fri 5',
  'Sat 6',
  'Sun 7',
  'Mon 8',
  'Tue 9',
  'Wed 10',
  'Thu 11',
  'Fri 12',
  'Sat 13',
  'Mon 14',
  'Tue 15',
  'Wed 16',
  'Thu 17',
  'Fri 18',
  'Sat 19',
  'Sun 20',
];
const SPORTS = [
  'Soccer',
  'Basketball',
  'Tennis',
  'Baseball',
  'Hockey',
  'Volleyball',
  'Swimming',
  'Athletics',
  'Cycling',
  'Rugby',
  'Netball',
  'Running',
  'Sprinting',
  'Ult Frisbee',
  'Cricket',
  'Table Tennis',
  'Archery',
  'Badminton',
  'Snowboarding',
  'Skiing',
  'Bobsled',
  'Archery',
  'MMA',
  'Soccer',
  'Basketball',
  'Tennis',
  'Baseball',
  'Hockey',
  'Volleyball',
  'Swimming',
  'Athletics',
  'Cycling',
  'Rugby',
  'Netball',
  'Running',
  'Sprinting',
  'Ult Frisbee',
  'Cricket',
  'Table Tennis',
  'Archery',
  'Badminton',
  'Snowboarding',
  'Skiing',
  'Bobsled',
  'Archery',
  'MMA',
];
const DATA = SPORTS.map((sport, i) =>
  DATES.map((_d, j) => `${sport[0]}${i}-${j}`)
);

export default function StickyTableExample() {
  return (
    <View style={exampleStyles.container}>
      <StickyTable
        columnHeaders={DATES}
        rowHeaders={SPORTS}
        data={DATA}
        renderColumnHeader={(date) => (
          <Text style={exampleStyles.headerText}>{date}</Text>
        )}
        renderRowHeader={(sport) => (
          <Text style={exampleStyles.headerText}>{sport}</Text>
        )}
        renderCell={(value) => (
          <Text style={exampleStyles.cellText}>{value}</Text>
        )}
        cellWidth={70}
        cellHeight={50}
        headerWidth={90}
        headerHeight={50}
      />
    </View>
  );
}

const exampleStyles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1 },
  headerText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  cellText: { fontSize: 13, color: '#333' },
});
