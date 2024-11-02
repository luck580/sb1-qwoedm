export default {
  name: 'reservation',
  title: 'Reservations',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Guest Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'time',
      title: 'Time',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'guests',
      title: 'Number of Guests',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(8)
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Cancelled', value: 'cancelled' }
        ]
      },
      initialValue: 'pending'
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true
    }
  ]
}