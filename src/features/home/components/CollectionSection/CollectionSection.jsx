import PracticeCard from "../PracticeCard/PracticeCard";
import TopicCard from "../TopicCard/TopicCard";
import QuickCard from "../QuickCard/QuickCard";
import styles from "./CollectionSection.module.css";

// Maps a collection's `meta.card` to the component that draws one item.
// New card style? Add a component here, then set "card": "<key>" in the collection JSON.
export const CARD_COMPONENTS = { practice: PracticeCard, topic: TopicCard, quick: QuickCard };

export default function CollectionGrid({ collection, limit, columns }) {
  const Card = CARD_COMPONENTS[collection.meta.card] ?? TopicCard;
  const items = limit ? collection.items.slice(0, limit) : collection.items;
  const cols = columns ?? (collection.meta.card === "practice" ? 3 : 3);
  return (
    <div className={`${styles.grid} ${collection.meta.card === "practice" ? styles.bento : ""}`} style={{ "--cols": cols }}>
      {items.map((item) => <Card key={item.slug} item={item} />)}
    </div>
  );
}
