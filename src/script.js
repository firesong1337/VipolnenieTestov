import './styles/_style.scss';
import TestsModel from './model.js';
import TestsView from './view/view.js';
import TestsController from './controller.js';

const model = new TestsModel();
const view = new TestsView();
const controller = new TestsController(model, view);

controller.init();