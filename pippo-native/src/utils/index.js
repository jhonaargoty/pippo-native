import { ListItem } from "@rneui/themed";

keyExtractor = (item, index) => index.toString();

export const renderItem = ({ item, type, onPress }) => {
  return (
    <ListItem bottomDivider onPress={() => onPress(item.name)}>
      {item?.avatar_url && <Avatar source={{ uri: item?.avatar_url }} />}
      <ListItem.Content>
        <ListItem.Title>{item?.name}</ListItem.Title>
        {item?.subtitle && (
          <ListItem.Subtitle>{item?.subtitle}</ListItem.Subtitle>
        )}
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};
