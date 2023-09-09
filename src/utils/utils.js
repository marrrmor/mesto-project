import { Card } from '../components';
import { cardTemplateId } from '../utils';

export function createCard(data, userId, photoPopup, api) {
  const card = new Card({
    data,
    templateId: cardTemplateId,
    userId,
    onClickPhoto: ({ name, link }) => photoPopup.openPopup({ name, link }),
    onDeleteCard: async ({ _id }) => await api.deleteCard(_id).catch(console.warn),
    onAddLike: async ({ _id }) => await api.putLike(_id).catch(console.warn),
    onDeleteLike: async ({ _id }) => await api.deleteLike(_id).catch(console.warn),
  });

  return card.generate();
}
