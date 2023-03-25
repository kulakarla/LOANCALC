import {createRouter, createWebHistory} from 'vue-router'
import MainView from "@/views/MainView";
import LoanFail from "@/views/LoanFail";
import InitialPeriodSuccess from "@/views/InitialPeriodSuccess";
import AlternativePeriodSuccess from "@/views/AlternativePeriodSuccess";

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainView
    },
    {
        path: '/failure',
        name: 'loanfail',
        component: LoanFail
    },
    {
        path: '/success/:loansum/:period',
        name: InitialPeriodSuccess,
        component: InitialPeriodSuccess

    },
    {
        path: '/success/:loansum/:minimumloanperiod/:desiredloanperiod',
        name: AlternativePeriodSuccess,
        component: AlternativePeriodSuccess

    }

]

const router = createRouter( {
    history: createWebHistory(process.env.BASE_URL),
    routes

})

export default router