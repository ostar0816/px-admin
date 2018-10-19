export const navigation = [
  {
    'id': 'pyxis-website',
    'title': 'Pyxis website',
    'type': 'group',
    'icon': 'apps',
    'children': [
      {
        'id': 'article-management',
        'title': 'Article Management',
        'type': 'collapse',
        'icon': 'school',
        'children': [
          {
            'id': 'categories',
            'title': 'Category & Articles',
            'type': 'item',
            'url': '/article-management/categories'
          },
          {
            'id': 'edit-category',
            'title': 'New Category',
            'type': 'item',
            'url': '/article-management/category-edit/new'
          },
          {
            'id': 'edit-article',
            'title': 'New Article',
            'type': 'item',
            'url': '/article-management/article-edit/new'
          }
        ]
      },
      {
        'id': 'team-management',
        'title': 'Team Management',
        'type': 'item',
        'icon': 'supervised_user_circle',
        'url': '/team-management'
      },
      {
        'id': 'subscribed-users',
        'title': 'Subscribed Users',
        'type': 'item',
        'icon': 'supervisor_account',
        'url': '/subscribed-users'
      },
      {
        'id': 'terms-of-use',
        'title': 'Terms of Use',
        'type': 'item',
        'icon': 'notification_important',
        'url': '/terms-of-use'
      },
      {
        'id': 'privacy-policy',
        'title': 'Privacy Policy',
        'type': 'item',
        'icon': 'security',
        'url': '/privacy-policy'
      },
    ]
  }
];
