/* eslint-disable prettier/prettier */

export type SearchInput = {
  page?: number
  per_page?: number
  sort?: string | null
  sort_dir?: string | null
  filter?: string | null
}

export type SearchOutput<Model> = {
  itens: Model[]
  total: number
  current_page: number
  sort: string | null
  sort_dir: string | null
  per_page: number
  filter: string | null
}

export interface RepositoriesInterface<Model, CreateProps> {
  create(props: CreateProps): Model
  insert(model: Model): Promise<Model>
  findById(id: string): Promise<Model>
  update(model: Model): Promise<Model>
  delete(id: string): Promise<void>
  search(props: SearchInput): Promise<SearchOutput<Model>>
}
