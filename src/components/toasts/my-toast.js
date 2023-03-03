import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {VStack, HStack, Text, IconButton, CloseIcon, Alert} from 'native-base';

export default function MyToast(props) {
  const title = props.title;
  const description = props.description;
  const status = props.status;
  const onPress = props.onPress;

  const [visible, setVisible] = useState(true);

  return (
    <>
      {visible && (
        <Alert
          maxWidth="100%"
          minHeight={60}
          alignSelf="center"
          flexDirection="row"
          status={status}
          variant="left-accent"
          px="2"
          py="1"
          rounded="sm"
          mb={5}>
          <VStack space={1} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              alignItems="center"
              justifyContent="space-between">
              <HStack space={2} flexShrink={1} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  flexShrink={1}
                  color={null}>
                  {title}
                </Text>
              </HStack>

              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: 'darkText',
                }}
                onPress={() => setVisible(false)}
              />
            </HStack>
            <Text px="6" color={null}>
              {description}
            </Text>
          </VStack>
        </Alert>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
