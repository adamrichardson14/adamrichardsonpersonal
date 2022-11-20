export interface Page {
  object: string;
  id: string;
  created_time: Date;
  last_edited_time: Date;
  created_by: TedBy;
  last_edited_by: TedBy;
  cover: null;
  icon: null;
  parent: Parent;
  archived: boolean;
  properties: Properties;
  url: string;
}

export interface TedBy {
  object: string;
  id: string;
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface Properties {
  author: Author;
  Tags: MultiSelect;
  slug: Description;
  Category: Category;
  "Multi-select": MultiSelect;
  date: PropertiesDate;
  Tweet: Description;
  Created: Created;
  published: Published;
  Description: Description;
  title: Title;
}

export interface Category {
  id: string;
  type: string;
  select: Select;
}

export interface Select {
  id: string;
  name: string;
  color: string;
}

export interface Created {
  id: string;
  type: string;
  created_time: Date;
}

export interface Description {
  id: string;
  type: string;
  rich_text: RichText[];
}

export interface RichText {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: null;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Text {
  content: string;
  link: null;
}

export interface MultiSelect {
  id: string;
  type: string;
  multi_select: Select[];
}

export interface Author {
  id: string;
  type: string;
  people: PersonElement[];
}

export interface PersonElement {
  object: string;
  id: string;
  name: string;
  avatar_url: string;
  type: string;
  person: PersonPerson;
}

export interface PersonPerson {}

export interface PropertiesDate {
  id: string;
  type: string;
  date: DateDate;
}

export interface DateDate {
  start: Date;
  end: null;
  time_zone: null;
}

export interface Published {
  id: string;
  type: string;
  checkbox: boolean;
}

export interface Title {
  id: string;
  type: string;
  title: RichText[];
}

export interface dbQuery {
  database_id: string;
  filter: {
    and: [{ property: string; checkbox: { equals: boolean } }];
  };
  sorts: [{ property: string; direction: "ascending" | "descending" }];
  page_size: number;
}

export interface dbQueryCode {
  database_id: string;
  filter: {
    and: [
      {
        property: string;
        checkbox: { equals: boolean };
      },
      {
        property: string;
        select: { equals: string };
      }
    ];
  };
  sorts: [{ property: string; direction: "ascending" | "descending" }];
  page_size: number;
}

export interface dbQuerySlug {
  database_id: string;
  filter: {
    and: [
      { property: string; checkbox: { equals: boolean } },
      { property: string; rich_text: { equals: string } }
    ];
  };
  sorts: [{ property: string; direction: "ascending" | "descending" }];
  page_size: number;
}
