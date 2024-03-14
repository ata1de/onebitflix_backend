// src/models/Course.ts

import { database } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

export interface Course {
  id: number
  name: string
  synopsis: string
  thumbnailUrl: string
  featured: boolean
  categoryId: number
}

// atributo de criação para a categoria, destacando as opcionais
export interface CourseCreationAttributes extends Optional<Course, 'id' | 'thumbnailUrl' | 'featured' > {}

// instancia do model categoria, juntar as propriedades de metodos do sequelize
export interface CourseInstance extends Model<Course, CourseCreationAttributes>, Course {}

export const Course = database.define<CourseInstance, Course>('Course', {
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
  synopsis: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  thumbnailUrl: {
    type: DataTypes.STRING
  },
  featured: {
    defaultValue: false,
    type: DataTypes.BOOLEAN
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: 'categories', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})