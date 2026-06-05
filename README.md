# react-native-dual-sticky-table

A React Native component for rendering tables with both a sticky column header (top) and a sticky row header (left). Built on [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) for smooth, jank-free scrolling on the UI thread.

<hr />



## Demo

![Dual Sticky Table](./assets/StickyTableDemo.mp4)



## Installation

```sh
npm install react-native-dual-sticky-table
```



## Usage


```js
import StickyTable from 'react-native-dual-sticky-table';
import { Text, StyleSheet } from 'react-native';

const DATES = ['Mon 1', 'Tue 2', 'Wed 3', 'Thu 4', 'Fri 5', 'Sat 6', 'Sun 7', 'Mon 8', 'Tue 9'];
const SPORTS = ['Soccer', 'Basketball', 'Tennis', 'Baseball', 'Hockey'];
const DATA = SPORTS.map((sport, i) => DATES.map((_d, j) => `${sport[0]}${i}-${j}`));

<StickyTable
  columnHeaders={DATES}
  rowHeaders={SPORTS}
  data={DATA}
  cellWidth={70}
  cellHeight={50}
  headerWidth={90}
  headerHeight={50}
  renderColumnHeader={(date) => <Text>{date}</Text>}
  renderRowHeader={(sport) => <Text>{sport}</Text>}
  renderCell={(value) => <Text>{value}</Text>}
  columnHeaderStyles={exampleStyles.columnHeaderCell}
  rowHeaderStyles={exampleStyles.rowHeaderCell}
  cellStyles={exampleStyles.cell}
  cornerCellStyles={exampleStyles.cornerCell}
/>
const exampleStyles = StyleSheet.create({
  // ...
});
```



## Props

`StickyTable` is a generic component - the types of your column headers, row headers, and cell data are all inferred from the arrays you pass in.

### Data

| Prop | Type | Required | Description |
|---|---|---|---|
| `columnHeaders` | `TColumn[]` | ✅ | Array of values for the top header row. |
| `rowHeaders` | `TRow[]` | ✅ | Array of values for the left header column. |
| `data` | `TCell[][]` | ✅ | 2D array of cell values. `data[rowIndex][columnIndex]` maps to the cell at that position. The number of rows must match `rowHeaders.length` and the number of columns per row must match `columnHeaders.length`. |

### Dimensions

All cells share the same dimensions - flexible per-cell sizing is not supported.

| Prop | Type | Required | Description |
|---|---|---|---|
| `cellWidth` | `number` | ✅ | Width of every data cell and column header cell. |
| `cellHeight` | `number` | ✅ | Height of every data cell and row header cell. P.S. On Android certain combinations of cellHeight and border widths caused unexpected gaps between row headers. If you run in to this, try adjusting cellHeight or it's padding. |
| `headerWidth` | `number` | ✅ | Width of the sticky left column (row headers and the corner cell). |
| `headerHeight` | `number` | ✅ | Height of the sticky top row (column headers and the corner cell). |

### Render Functions

These props are render functions - they receive a data item and return a React node.

| Prop | Type | Required | Description |
|---|---|---|---|
| `renderColumnHeader` | `(column: TColumn, index: number) => ReactNode` | ✅ | Renders each cell of the column header. Receives the header value from `columnHeaders` and its index. |
| `renderRowHeader` | `(row: TRow, index: number) => ReactNode` | ✅ | Renders each cell of the row header. Receives the header value from `rowHeaders` and its index. |
| `renderCell` | `(cell: TCell, rowIndex: number, columnIndex: number) => ReactNode` | ✅ | Renders each data cell in the scrollable body. |
| `renderCorner` | `() => ReactNode` | - | Renders the fixed cell in the top-left corner where the two header axes meet. If omitted, the corner cell is left empty. |

### Styles

Use these to set custom styles. They accept any value of the React Native type `StyleProp<ViewStyle>`, including those created by `Stylesheet.create`.

| Prop | Type | Required | Description |
|---|---|---|---|
| `cornerCellStyles` | `StyleProp<ViewStyle>` | ✅ | Styles for the top-left corner cell. |
| `columnHeaderStyles` | `StyleProp<ViewStyle>` | - | Styles applied to each cell in the top header row. |
| `rowHeaderStyles` | `StyleProp<ViewStyle>` | - | Styles applied to each cell in the left header column. |
| `cellStyles` | `StyleProp<ViewStyle>` | - | Styles applied to each cell in the scrollable data body. |



## Example

Clone the repo and install the dependencies:
```sh
yarn
```

The run one of the following:
```sh
yarn example android
yarn example web
yarn example ios
```

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)



## Disclaimer

This library has not been tested on iOS as the author has no access to an Apple device.



## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
