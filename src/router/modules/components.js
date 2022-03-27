/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
	path: '/components',
	component: Layout,
	redirect: 'noRedirect',
	name: 'ComponentDemo',
	meta: {
		title: '其他组件',
		icon: 'component'
	},
	children: [
		{
			path: '/keyboard',
			component: () => import('@/views/zip/charts/keyboard'),
			name: 'KeyboardChart',
			meta: { title: 'keyboardChart', noCache: true }
		},
		{
			path: 'line',
			component: () => import('@/views/zip/charts/line'),
			name: 'LineChart',
			meta: { title: 'lineChart', noCache: true }
		},
		{
			path: '/pdf/download',
			component: () => import('@/views/zip/pdf/download'),
			hidden: true
		},
		{
			path: 'mix-chart',
			component: () => import('@/views/zip/charts/mix-chart'),
			name: 'MixChart',
			meta: { title: 'mixChart', noCache: true }
		},
		{
			path: 'index',
			component: () => import('@/views/zip/icons/index'),
			name: 'Icons',
			meta: { title: 'icons', noCache: true }
		},
		{
			path: 'tinymce',
			component: () => import('@/views/zip/components-demo/tinymce'),
			name: 'TinymceDemo',
			meta: { title: 'tinymce' }
		},
		{
			path: 'markdown',
			component: () => import('@/views/zip/components-demo/markdown'),
			name: 'MarkdownDemo',
			meta: { title: 'markdown' }
		},
		{
			path: 'json-editor',
			component: () => import('@/views/zip/components-demo/json-editor'),
			name: 'JsonEditorDemo',
			meta: { title: 'jsonEditor' }
		},
		{
			path: 'split-pane',
			component: () => import('@/views/zip/components-demo/split-pane'),
			name: 'SplitpaneDemo',
			meta: { title: 'splitPane' }
		},
		{
			path: 'avatar-upload',
			component: () => import('@/views/zip/components-demo/avatar-upload'),
			name: 'AvatarUploadDemo',
			meta: { title: 'avatarUpload' }
		},
		{
			path: 'dropzone',
			component: () => import('@/views/zip/components-demo/dropzone'),
			name: 'DropzoneDemo',
			meta: { title: 'dropzone' }
		},
		{
			path: 'sticky',
			component: () => import('@/views/zip/components-demo/sticky'),
			name: 'StickyDemo',
			meta: { title: 'sticky' }
		},
		{
			path: 'count-to',
			component: () => import('@/views/zip/components-demo/count-to'),
			name: 'CountToDemo',
			meta: { title: 'countTo' }
		},
		{
			path: 'mixin',
			component: () => import('@/views/zip/components-demo/mixin'),
			name: 'ComponentMixinDemo',
			meta: { title: 'componentMixin' }
		},
		{
			path: 'back-to-top',
			component: () => import('@/views/zip/components-demo/back-to-top'),
			name: 'BackToTopDemo',
			meta: { title: 'backToTop' }
		},
		{
			path: 'drag-dialog',
			component: () => import('@/views/zip/components-demo/drag-dialog'),
			name: 'DragDialogDemo',
			meta: { title: 'dragDialog' }
		},
		{
			path: 'drag-select',
			component: () => import('@/views/zip/components-demo/drag-select'),
			name: 'DragSelectDemo',
			meta: { title: 'dragSelect' }
		},
		{
			path: 'dnd-list',
			component: () => import('@/views/zip/components-demo/dnd-list'),
			name: 'DndListDemo',
			meta: { title: 'dndList' }
		},
		{
			path: 'drag-kanban',
			component: () => import('@/views/zip/components-demo/drag-kanban'),
			name: 'DragKanbanDemo',
			meta: { title: 'dragKanban' }
		},
		{
			path: 'create',
			component: () => import('@/views/example/create'),
			name: 'CreateArticle',
			meta: { title: 'createArticle' }
		},
		{
			path: 'edit/:id(\\d+)',
			component: () => import('@/views/example/edit'),
			name: 'EditArticle',
			meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
			hidden: true
		},
		{
			path: 'list',
			component: () => import('@/views/example/list'),
			name: 'ArticleList',
			meta: { title: 'articleList' }
		},
		{
			path: 'tab/index',
			component: () => import('@/views/tab/index'),
			name: 'Tab',
			meta: { title: 'tab' }
		},
		{
			path: '401',
			component: () => import('@/views/error-page/401'),
			name: 'Page401',
			meta: { title: 'page401', noCache: true }
		},
		{
			path: '404',
			component: () => import('@/views/error-page/404'),
			name: 'Page404',
			meta: { title: 'page404', noCache: true }
		},
		{
			path: 'log',
			component: () => import('@/views/error-log/index'),
			name: 'ErrorLog',
			meta: { title: 'errorLog' }
		},
		{
			path: 'download',
			component: () => import('@/views/zip/index'),
			name: 'ExportZip',
			meta: { title: 'exportZip' }
		},
		{
			path: 'pdf/index',
			component: () => import('@/views/zip/pdf/index'),
			name: 'PDF',
			meta: { title: 'pdf' }
		},
		{
			path: 'theme/index',
			component: () => import('@/views/zip/theme/index'),
			name: 'Theme',
			meta: { title: 'theme' }
		},
		{
			path: 'clipboard/index',
			component: () => import('@/views/zip/clipboard/index'),
			name: 'ClipboardDemo',
			meta: { title: 'clipboardDemo' }
		},
		{
			path: 'https://github.com/PanJiaChen/vue-element-admin',
			meta: { title: 'externalLink' }
		},
		{
			path: 'export-excel',
			component: () => import('@/views/excel/export-excel'),
			name: 'ExportExcel',
			meta: { title: 'exportExcel' }
		},
		{
			path: 'export-selected-excel',
			component: () => import('@/views/excel/select-excel'),
			name: 'SelectExcel',
			meta: { title: 'selectExcel' }
		},
		{
			path: 'export-merge-header',
			component: () => import('@/views/excel/merge-header'),
			name: 'MergeHeader',
			meta: { title: 'mergeHeader' }
		},
		{
			path: 'upload-excel',
			component: () => import('@/views/excel/upload-excel'),
			name: 'UploadExcel',
			meta: { title: 'uploadExcel' }
		},
		{
			path: 'guide/index',
			component: () => import('@/views/zip/guide/index'),
			name: 'Guide',
			meta: { title: 'guide', noCache: true }
		},
		{
			path: 'dynamic-table',
			component: () => import('@/views/table/dynamic-table/index'),
			name: 'DynamicTable',
			meta: { title: 'dynamicTable' }
		},
		{
			path: 'drag-table',
			component: () => import('@/views/table/drag-table'),
			name: 'DragTable',
			meta: { title: 'dragTable' }
		},
		{
			path: 'inline-edit-table',
			component: () => import('@/views/table/inline-edit-table'),
			name: 'InlineEditTable',
			meta: { title: 'inlineEditTable' }
		},
		{
			path: 'complex-table',
			component: () => import('@/views/table/complex-table'),
			name: 'ComplexTable',
			meta: { title: 'complexTable' }
		}
	]
}

export default componentsRouter
