/**
*
*	COMPUTE: mvariance
*
*
*	DESCRIPTION:
*		- Computes a moving sample variance over a numeric array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MOVING SAMPLE VARIANCE //

/**
* FUNCTION: mvariance( arr, window )
*	Computes a moving sample variance over a numeric array.
*
* @param {Array} arr - array of data values
* @param {Number} window - size of moving window
* @returns {Array} array of sample variance values
*/
function mvariance( arr, W ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'mvariance()::invalid input argument. Must provide an array.' );
	}
	if ( typeof W !== 'number' || W !== W ) {
        throw new TypeError( 'mvariance()::invalid input argument. Window must be numeric.' );
    }
    if ( (W%1) !== 0 || W < 1 ) {
        throw new TypeError( 'mvariance()::invalid input argument. Window must be a positive integer.' );
    }
	if ( W > arr.length ) {
		throw new TypeError( 'mvariance()::invalid input argument. Window cannot exceed the array length.' );
	}
	var len = arr.length,
		out = new Array( len-W+1 ),
		n = W - 1,
		mu = 0,
		M2 = 0,
		delta,
		x1,
		x2,
		d1,
		d2,
		i, j;

	if ( W === 1 ) {
		for ( i = 0; i < out.length; i++ ) {
			out[ i ] = 0;
		}
		return out;
	}

	// Compute the sample variance for the first window...
	for ( i = 0; i < W; i++ ) {
		x1 = arr[ i ];
		delta = x1 - mu;
		mu += delta / (i+1);
		M2 += delta * (x1 - mu);
	}
	out[ 0 ] = M2 / n;

	// Compute the remaining sample variances...
	for ( j = W; j < len; j++ ) {
		i = j - W;
		x1 = arr[ i ];
		x2 = arr[ j ];
		delta = x2 - x1;
		d1 = x1 - mu;
		mu += delta / W;
		d2 = x2 - mu;
		M2 += delta * (d1+d2);
		out[ i+1 ] = M2 / n;
	}
	return out;
} // end FUNCTION mvariance()


// EXPORTS //

module.exports = mvariance;
