// src/models/index.ts
// arquivo para tratar as associações
import { Category } from './Category'
import { Course } from './Course'
import { Episode } from './Episode'
import { Favorite } from './Favorite'
import { Like } from './Like'
import { User } from './User'

Category.hasMany(Course, {as: 'courses'})

Course.belongsTo(Category)
Course.hasMany(Episode, {as: 'episodes'})
Course.hasMany(Favorite, {as: 'FavoritesUsers', foreignKey: 'course_id'})
Course.belongsToMany(User, {through: Favorite})
Course.belongsToMany(User, { through: Like })

Episode.belongsTo(Course)

Favorite.belongsTo(Course)
Favorite.belongsTo(User)

User.belongsToMany(Course, {through: Favorite})
User.hasMany(Favorite, {as: 'FavoritesCourses', foreignKey: 'user_id'})
User.belongsToMany(Course, { through: Like })

export {
  Category,
  Course,
  Episode,
  User,
  Favorite,
  Like
}