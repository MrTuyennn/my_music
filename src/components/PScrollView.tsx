import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

export interface PScrollViewProps extends ScrollViewProps {
  children?: React.ReactNode;
}

function PScrollView(props: PScrollViewProps) {
  return (
    <ScrollView
      style={{ backgroundColor: 'white' }}
      overScrollMode="never"
      bounces={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item: { id: any }, index: any) =>
        item ? `${item.id}-${index}` : index
      }
      {...props}>
      {props.children}
    </ScrollView>
  );
}
export default PScrollView;
