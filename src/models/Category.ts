// src/models/Category.ts

import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

// criando um tipo para a categoria
export interface Category {
  id: number
  name: string
  position: number
}

// atributod de criação para a categoria, destacando as opcionais
export interface CategoryCreationAttributes extends Optional<Category, 'id'> {}

// instancia do model categoria, juntar as propriedades de metodos do sequelize
export interface CategoryInstance extends Model<Category, CategoryCreationAttributes>, Category {}

export const Category = database.define<CategoryInstance, Category>('Category', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  position: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER
  }
})