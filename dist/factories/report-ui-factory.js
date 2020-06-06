"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
let ReportUiFactory = class ReportUiFactory {
    constructor() {
        this.getUiAttributes = (hasPassed) => {
            if (hasPassed) {
                return {
                    color: 'panel-success',
                    warning: 'Good'
                };
            }
            else if (hasPassed) {
                return {
                    color: 'panel-danger',
                    warning: 'Warning'
                };
            }
            return {
                color: 'panel-warning',
                warning: 'Info'
            };
        };
    }
};
ReportUiFactory = __decorate([
    typedi_1.Service()
], ReportUiFactory);
exports.ReportUiFactory = ReportUiFactory;
//# sourceMappingURL=report-ui-factory.js.map