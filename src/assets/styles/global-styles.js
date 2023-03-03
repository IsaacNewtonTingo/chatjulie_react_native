import {StyleSheet} from 'react-native';
import colors from '../colors/colors';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    padding: 10,
  },
  logoContainer: {
    alignSelf: 'center',
  },
  label: {
    textAlign: 'left',
    fontSize: 14,
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    textAlign: 'left',
    marginBottom: 10,
  },
  iconRight: {
    marginRight: 10,
  },
});

export default globalStyles;
