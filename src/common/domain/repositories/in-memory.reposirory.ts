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

  search(props: SearchInput): Promise<SearchOutput<Model>> {
    throw new Error('Method not implemented.')
  }

  protected async _get(id: string): Promise<Model> {
    const model = this.items.find(item => item.id == id)
    if (!model) {
      throw new NotFoundError(`Model NotFound ID ${id}`)
    }
    return model
  }
}
