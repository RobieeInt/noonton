<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\SubscriptionPlan\Store;
use App\Http\Requests\Admin\SubscriptionPlan\Update;


class SubscriptionPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        // return inertia('Admin/SubscriptionPlan/Index');
        $subscriptionPlan = SubscriptionPlan::withTrashed()->orderBy('deleted_at')->get();
        return inertia('Admin/SubscriptionPlan/Index', [
            'subscriptionPlan' => $subscriptionPlan,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Admin/SubscriptionPlan/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Store $request)
    {
        $data = $request->validated();
        //save array to json
        // dd($data);
        $data['features'] = json_encode($data['features']);
        // dd($data);
        SubscriptionPlan::create($data);
        // return $request->all();
        return redirect(route('admin.dashboard.subscriptionPlan.index'))->with([
            'type' => 'success',
            'message' => 'Paket Berlangganan Berhasil Dibuat !'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SubscriptionPlan  $subscriptionPlan
     * @return \Illuminate\Http\Response
     */
    public function show(SubscriptionPlan $subscriptionPlan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SubscriptionPlan  $subscriptionPlan
     * @return \Illuminate\Http\Response
     */
    public function edit(SubscriptionPlan $subscriptionPlan)
    {
        return inertia('Admin/SubscriptionPlan/Edit', [
            'subscriptionPlan' => $subscriptionPlan,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SubscriptionPlan  $subscriptionPlan
     * @return \Illuminate\Http\Response
     */
    public function update(Update $request, SubscriptionPlan $subscriptionPlan)
    {
        $data = $request->validated();
        //save array to json
        // $data['features'] = json_encode($data['features']);
        // gause di encode lagi kalo update
        // dd($data);
        $subscriptionPlan->update($data);
        // return $request->all();
        return redirect(route('admin.dashboard.subscriptionPlan.index'))->with([
            'type' => 'success',
            'message' => 'Paket Berlangganan Berhasil Diupdate !'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SubscriptionPlan  $subscriptionPlan
     * @return \Illuminate\Http\Response
     */
    public function destroy(SubscriptionPlan $subscriptionPlan)
    {
        $subscriptionPlan->delete();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Paket Berlangganan Berhasil Dihapus !'
        ]);
    }

    public function restore($id)
    {
        $subscriptionPlan = SubscriptionPlan::withTrashed()->find($id);
        $subscriptionPlan->restore();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Paket Berlangganan Berhasil Dikembalikan !'
        ]);
    }
}
