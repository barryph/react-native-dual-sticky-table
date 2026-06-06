import React from 'react';
import { View, StyleSheet, type ViewStyle, type StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedRef,
  scrollTo,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import type { ReanimatedScrollEvent } from 'react-native-reanimated/lib/typescript/hook/commonTypes';

type StickyTableProps<TCell, TColumn, TRow> = {
  columnHeaders: TColumn[];
  rowHeaders: TRow[];
  data: TCell[][];
  cellWidth: number;
  cellHeight: number;
  headerWidth: number;
  headerHeight: number;
  renderColumnHeader: (column: TColumn, index: number) => React.ReactNode;
  renderRowHeader: (row: TRow, index: number) => React.ReactNode;
  renderCell: (
    cell: TCell,
    rowIndex: number,
    columnIndex: number
  ) => React.ReactNode;
  renderCorner?: () => React.ReactNode;
  columnHeaderStyles?: StyleProp<ViewStyle>;
  rowHeaderStyles?: StyleProp<ViewStyle>;
  cellStyles?: StyleProp<ViewStyle>;
  cornerCellStyles?: StyleProp<ViewStyle>;
};

export default function StickyTable<TCell, TColumn, TRow>({
  columnHeaders,
  rowHeaders,
  data,
  cellWidth,
  cellHeight,
  headerWidth,
  headerHeight,
  renderColumnHeader,
  renderRowHeader,
  renderCell,
  renderCorner,
  columnHeaderStyles,
  rowHeaderStyles,
  cellStyles,
  cornerCellStyles,
}: StickyTableProps<TCell, TColumn, TRow>) {
  const scrollX = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const columnHeaderRef = useAnimatedRef();
  const rowHeaderRef = useAnimatedRef();

  // Runs on the UI thread
  const scrollHandlerX = useAnimatedScrollHandler({
    onScroll: (event: ReanimatedScrollEvent) => {
      scrollX.value = event.contentOffset.x;
    },
  });
  const scrollHandlerY = useAnimatedScrollHandler({
    onScroll: (event: ReanimatedScrollEvent) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Sync the "scroll" position of the headers with the body
  useDerivedValue(() => {
    scrollTo(columnHeaderRef, scrollX.value, 0, false);
  });
  useDerivedValue(() => {
    scrollTo(rowHeaderRef, 0, scrollY.value, false);
  });

  return (
    <View style={styles.container}>
      {/* Top row: corner + horizontal sticky header */}
      <View style={styles.row}>
        <View
          style={[
            styles.cornerCell,
            { width: headerWidth, height: headerHeight },
            cornerCellStyles,
          ]}
        >
          {renderCorner?.()}
        </View>

        {/* Top Header */}
        <View style={styles.columnHeaderClip}>
          <Animated.ScrollView
            ref={columnHeaderRef}
            style={styles.row}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          >
            {columnHeaders.map((column, index) => (
              <View
                key={index}
                style={[
                  styles.columnHeaderCell,
                  { width: cellWidth, height: headerHeight },
                  columnHeaderStyles,
                ]}
              >
                {renderColumnHeader(column, index)}
              </View>
            ))}
          </Animated.ScrollView>
        </View>
      </View>

      {/* Main - vertical sticky header + scrollable body */}
      <View style={styles.main}>
        {/* Left Header */}
        <View style={[styles.rowHeaderClip, { width: headerWidth }]}>
          <Animated.ScrollView
            ref={rowHeaderRef}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          >
            {rowHeaders.map((row, index) => (
              <View
                key={index}
                style={[
                  styles.rowHeaderCell,
                  { width: headerWidth, height: cellHeight },
                  rowHeaderStyles,
                ]}
              >
                {renderRowHeader(row, index)}
              </View>
            ))}
          </Animated.ScrollView>
        </View>

        {/* Scrollable body */}
        <Animated.ScrollView horizontal onScroll={scrollHandlerX}>
          <Animated.ScrollView
            onScroll={scrollHandlerY}
            nestedScrollEnabled={true}
          >
            {data.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((cell, index) => (
                  <View
                    key={index}
                    style={[
                      styles.cell,
                      { width: cellWidth, height: cellHeight },
                      cellStyles,
                    ]}
                  >
                    {renderCell(cell, rowIndex, index)}
                  </View>
                ))}
              </View>
            ))}
          </Animated.ScrollView>
        </Animated.ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  columnHeaderClip: {
    overflow: 'hidden',
    flex: 1,
  },
  rowHeaderClip: {
    overflow: 'hidden',
  },
  cornerCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flexDirection: 'row',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  columnHeaderCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowHeaderCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
