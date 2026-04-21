import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArticleCard } from "./ArticleCard";
import {
  defaultArticleListItemFixture,
  longTitleArticleListItemFixture,
  minimalMetaArticleListItemFixture,
  noExcerptArticleListItemFixture,
  noImageArticleListItemFixture,
  updatedOnlyArticleListItemFixture,
} from "./__fixtures__/articleList.fixture";
import "./ArticleCard.stories.css";

const meta: Meta<typeof ArticleCard> = {
  title: "Articles/ArticleCard",
  component: ArticleCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="article-card-story__frame">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

export const Default: Story = {
  args: {
    article: defaultArticleListItemFixture,
  },
};

export const NoImage: Story = {
  args: {
    article: noImageArticleListItemFixture,
  },
};

export const NoExcerpt: Story = {
  args: {
    article: noExcerptArticleListItemFixture,
  },
};

export const MinimalMeta: Story = {
  args: {
    article: minimalMetaArticleListItemFixture,
  },
};

export const UpdatedOnly: Story = {
  args: {
    article: updatedOnlyArticleListItemFixture,
  },
};

export const LongTitle: Story = {
  args: {
    article: longTitleArticleListItemFixture,
  },
};
