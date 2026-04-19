import PageWrapper from "@/components/page-wrapper";
import { HomePageCategoryWithProducts } from "@/types/home";
import { FC } from "react";
import CollectionCard from "./collection-card";

type PropsType = {
  categories: HomePageCategoryWithProducts[];
};

const Collections: FC<PropsType> = ({ categories }) => {
  return (
    <PageWrapper>
      {categories.map((category, index) => (
        <CollectionCard category={category} index={index} key={category.id} />
      ))}
    </PageWrapper>
  );
};

export default Collections;
