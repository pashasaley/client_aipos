import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Users from '@/components/Users';
import Conferences from '@/components/Conferences';
import Tags from '@/components/Tags';
import Rooms from '@/components/Rooms';
import Papers from '@/components/Papers';
import Presentations from '@/components/Presentations';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
	{
      path: '/user',
      name: 'Users',
      component: Users,
    },
	{
      path: '/tag',
      name: 'Tags',
      component: Tags,
    },
	{
      path: '/conference',
      name: 'Conferences',
      component: Conferences,
    },
	{
      path: '/presentation',
      name: 'Presentations',
      component: Presentations,
    },
	{
      path: '/paper',
      name: 'Papers',
      component: Papers,
    },
	{
      path: '/room',
      name: 'Rooms',
      component: Rooms,
    },
  ],
mode: 'history',
});
