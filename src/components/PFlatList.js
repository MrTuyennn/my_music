import { imagePath } from '../utils/imagePath';
import {
  HEIGHT_SCALE_RATIO,
  ptColor,
  style,
  WIDTH,
  WIDTH_SCALE_RATIO,
} from '../utils/styles';
import React, { PureComponent } from 'react';
import {
  FlatList,
  FlatListProps,
  Image,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { DotIndicator, SkypeIndicator,BarIndicator } from 'react-native-indicators';
import PScrollView from './PScrollView';

export interface PScrollViewProps extends FlatListProps {
  isLoading?: Boolean;
  renderFooter?: React.ReactNode;
  textNull?: String;
  refreshing?: Boolean;
  onRefresh?: () => void;
}

export default class PFlatList extends PureComponent<PScrollViewProps> {
  render() {
    const {
      isLoading,
      data,
      renderFooter,
      textNull,
      refreshing,
      onRefresh,
    } = this.props;
    if (data?.length === 0) {
      return (
        <PScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || false}
              onRefresh={onRefresh}
            />
          }>
          <View style={[{ flex: 1 }, style.center]}>
            {isLoading ? (
              <DotIndicator
                color={ptColor.appColor}
                size={5 * WIDTH_SCALE_RATIO}
                count={8}
              />
            ) : (
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:ptColor.gray2,
                width:WIDTH
              }}>
                <BarIndicator count={6} color={ptColor.gray6} size={50} animationDuration={1000} />
                <Text style={[style.textCaption,{
                  color:ptColor.gray3
                }]}>Chờ dữ liệu trong giây lát</Text>
              </View>
            )}
          </View>
        </PScrollView>
      );
    }
    return (
      <FlatList
        keyExtractor={(item, index) =>
          item && item.id ? `${item?.id?.toString()}` : index?.toString()
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        onEndReachedThreshold={0.05}
        ListFooterComponent={() => {
          if (isLoading) {
            return (
              <SkypeIndicator
                color={ptColor.appColor2}
                size={30 * WIDTH_SCALE_RATIO}
                style={{
                  paddingTop: 8 * HEIGHT_SCALE_RATIO,
                  paddingBottom: 16 * HEIGHT_SCALE_RATIO,
                }}
              />
            );
          }
          return renderFooter ? renderFooter : <View />;
        }}
        {...this.props}
      />
    );
  }
}
