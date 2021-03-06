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
var jobdetail_service_1 = require("./jobdetail.service");
var router_1 = require("@angular/router");
var alert_service_1 = require("../alert/alert.service");
var Subscription_1 = require("rxjs/Subscription");
var JobdetailComponent = (function () {
    function JobdetailComponent(alertService, router, jobdetailService) {
        var _this = this;
        this.alertService = alertService;
        this.router = router;
        this.jobdetailService = jobdetailService;
        this.subscription = new Subscription_1.Subscription();
        this.jobdetailService
            .getJobDetails(localStorage.getItem('jobId'))
            .subscribe(function (jobDetail) {
            _this.jobdetail = jobDetail;
            _this.equalcurrent = _this.jobdetail.company.userName == JSON.parse(localStorage.getItem("currentUser")).userName;
        }, function (error) {
            console.log(error);
        });
    }
    JobdetailComponent.prototype.ngOnDestroy = function () {
        // this.subscription.unsubscribe();
    };
    JobdetailComponent.prototype.editjob = function () {
        this.jobdetailService.jobform = this.jobdetail;
        this.router.navigate(['editjob']);
        // setTimeout(() =>
        //     {
        //         console.log(this.jobdetail);
        //         this.jobdetailService
        //             .jobDetail(this.jobdetail);
        //     },
        //     5);
    };
    JobdetailComponent.prototype.gotoUserview = function () {
        var _this = this;
        this.router.navigate(['userview']);
        this.jobdetailService
            .getUserEmail(this.jobdetail.company.email)
            .subscribe(function (data) {
            _this.viewuser = data;
            _this.setTime();
        }, function (error) {
            _this.alertService.error(error.text());
        });
    };
    JobdetailComponent.prototype.setTime = function () {
        var _this = this;
        setTimeout(function () {
            // console.log(this.viewuser);
            _this.jobdetailService
                .userView(_this.viewuser);
        }, 5);
    };
    JobdetailComponent.prototype.gotoCommentuser = function (email) {
        var _this = this;
        this.router.navigate(['userview']);
        this.jobdetailService
            .getUserEmail(email)
            .subscribe(function (data) {
            _this.viewuser = data;
            _this.setTime();
        }, function (error) {
            _this.alertService.error(error.text());
        });
    };
    JobdetailComponent.prototype.addComment = function (comment) {
        var _this = this;
        this.jobdetailService.addComment(comment, this.jobdetail.jobId)
            .subscribe(function (info) {
            _this.alertService.success("Comment Added", true);
            setTimeout(function () {
                window.location.reload();
            }, 500);
        }, function (error) {
            _this.alertService.error(error.text());
        });
    };
    return JobdetailComponent;
}());
JobdetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "jobdetail",
        templateUrl: "jobdetail.component.html",
        styleUrls: ['jobdetail.component.css']
    }),
    __metadata("design:paramtypes", [alert_service_1.AlertService,
        router_1.Router,
        jobdetail_service_1.JobdetailService])
], JobdetailComponent);
exports.JobdetailComponent = JobdetailComponent;
//# sourceMappingURL=jobdetail.component.js.map