/**
 * 3D Vector
 * @author Dave Taylor <dave.taylor@pogokid.com>
 */

(function(global) {
    'use strict';

    var Vec3 = function( x, y, z ) {
        this.listeners = [];
        this.set( x, y||x, z||x );
    };
    Vec3.scalar = function(n){
        return { x: n, y: n, z: n };
    };
    Vec3.prototype = {
        // simple events
        on: function( eventName, fn ) {
            this.listeners[eventName] = this.listeners[eventName] || [];
            this.listeners[eventName].push( fn );
            return this;
        },
        _trigger: function( eventName ) {
            if ( this.listeners[eventName] ) {
                for ( var i = 0; i < this.listeners[eventName].length; i++ ) {
                    this.listeners[eventName][i].call( this );
                }
            }
            return this;
        },

        // the core place to set the values
        set: function( x, y, z ) {
            this.x = x;
            this.y = y || x;
            this.z = z || x;
            this._trigger( 'set' );
            return this;
        },

        // the maths
        plus: function( v ) {
            return this.set(
                this.x + v.x,
                this.y + v.y,
                this.z + v.z
            );
        },
        minus: function( v ) {
            return this.set(
                this.x - v.x,
                this.y - v.y,
                this.z - v.z
            );
        },
        mult: function( v ) {
            return this.set(
                this.x * v.x,
                this.y * v.y,
                this.z * v.z
            );
        },
        div: function( v ) {
            return this.set(
                this.x / v.x,
                this.y / v.y,
                this.z / v.z
            );
        },
        mod: function( v ) {
            return this.set(
                this.x % v.x,
                this.y % v.y,
                this.z % v.z
            );
        },
        inv: function(){
            return this.set(
                this.x*=-1,
                this.y*=-1,
                this.z*=-1
            );
        },

        // functions which return a new instance
        Plus: function( v ) {
            return this.clone().plus( v );
        },
        Minus: function( v ) {
            return this.clone().minus( v );
        },
        Mult: function( v ) {
            return this.clone().multiply( v );
        },
        Mod: function( v ) {
            return this.clone().mod( v );
        },
        Inv: function(){
            return this.clone().inverse();
        },


        // helpers
        copy     : function( v ) {
            return this.set(v.x, v.y, v.z);
        },
        clone    : function() {
            var v = new Vec3();
            return v.copy( this );
        },
        equals   : function( v ) {
            return this.x === v.x && this.y === v.y;
        }


    };

    if (typeof exports !== 'undefined') {
        module.exports = Vec3;
    } else if (global.define && global.define.amd) {
        define(function(){ return Vec3; });
    } else {
        global.Vec3 = Vec3;
    }

})(this);