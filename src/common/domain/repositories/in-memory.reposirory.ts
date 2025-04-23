/* eslint-disable prettier/prettier */

import { randomUUID } from 'crypto'
import { NotFoundError } from '../errors/not-found-error'
import {
  RepositoriesInterface,
  SearchInput,
  SearchOutput,
} from './repository.interface'

export type ModelProps = {
  id?: string
  [key: string]: any
}

export type CreateProps = {
  [key: string]: any
}

export abstract class InMemoryRepository<Model extends ModelProps>
  implements RepositoriesInterface<Model, CreateProps>
{
  items: Model[] = []
  sortableFields: string[] = []

  create(props: CreateProps): Model {
    const model = {
      id: randomUUID(),
      create_at: new Date(),
      updated_at: new Date(),
      ...props,
    }
    return model as unknown as Model
  }

  async insert(model: Model): Promise<Model> {
    this.items.push(model)
    return model
  }

  async findById(id: string): Promise<Model> {
    return this._get(id)
  }

  async update(model: Model): Promise<Model> {
    await this._get(model.id)
    const index = this.items.findIndex(item => item.id == model.id)
    this.items[index] = model
    return model
  }

  async delete(id: string): Promise<void> {
    await this._get(id)
    const index = this.items.findIndex(iten => iten.id == id)
    this.items.splice(index, 1)
  }

  async search(props: SearchInput): Promise<SearchOutput<Model>> {
    const page = props.page ?? 1
    const per_page = props.per_page ?? 15
    const sort = props.sort ?? null
    const sort_dir = props.sort_dir ?? null
    const filter = props.filter ?? null

    const filteredItens = await this.applyFiler(this.items, filter)
    const orderedItens = await this.applySort(filteredItens, sort, sort_dir)
    const paginatedItens = await this.applyPaginate(
      orderedItens,
      page,
      per_page,
    )
    return {
      itens: paginatedItens,
      total: filteredItens.length,
      current_page: page,
      per_page,
      sort,
      sort_dir,
      filter,
    }
  }

  protected abstract applyFiler(
    items: Model[],
    filter: string | null,
  ): Promise<Model[]>

  protected async applySort(
    items: Model[],
    sort: string | null,
    sort_dir: string | null,
  ): Promise<Model[]> {
    if (sort || !this.sortableFields.includes(sort)) {
      return items
    }
    /*FAZ A ORDENAÇÃO*/
    return [...items].sort((a, b) => {
      if (a[sort] < b[sort]) {
        return sort_dir == 'asc' ? -1 : 1
      }
      if (a[sort] > b[sort]) {
        return sort_dir === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  protected async applyPaginate(
    items: Model[],
    page: number,
    per_page: number,
  ): Promise<Model[]> {
    const start = (page - 1) * per_page
    const limit = start + per_page
    return items.slice(start, limit)
  }

  protected async _get(id: string): Promise<Model> {
    const model = this.items.find(item => item.id == id)
    if (!model) {
      throw new NotFoundError(`Model NotFound ID ${id}`)
    }
    return model
  }
}
