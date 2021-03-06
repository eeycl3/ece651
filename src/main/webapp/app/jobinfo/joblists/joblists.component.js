"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var jobdetail_service_1 = require("../../jobdetail/jobdetail.service");
var router_1 = require("@angular/router");
var JoblistsComponent = (function () {
    function JoblistsComponent(router, jobdetailService) {
        this.router = router;
        this.jobdetailService = jobdetailService;
    }
    JoblistsComponent.prototype.goToJobDetail = function (job) {
        this.router.navigate(['jobdetail']);
        if (localStorage.getItem('jobId') != null) {
            localStorage.removeItem('jobId');
        }
        localStorage.setItem('jobId', job.jobId);
    };
    return JoblistsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], JoblistsComponent.prototype, "jobModels", void 0);
JoblistsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'joblists',
        templateUrl: 'joblists.component.html',
        styleUrls: ['joblists.component.css']
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        jobdetail_service_1.JobdetailService])
], JoblistsComponent);
exports.JoblistsComponent = JoblistsComponent;
//# sourceMappingURL=joblists.component.js.map