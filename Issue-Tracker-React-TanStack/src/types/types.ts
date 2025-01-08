export interface Issue {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
  createdAt: string;
  updatedAt: string;
  wasEditedInOpenPage?: boolean;
}
