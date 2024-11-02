export default {
  name: 'category',
  title: 'Menu Categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [{ type: 'menuItem' }]
    }
  ]
}