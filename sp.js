function SP_SETS_ACROSS(weight, reps, sets, rounding) {
  if (sets == undefined) { sets = 1; }

  var result = [];
  for(i = 0; i < sets; i++) {
    result.push([SP_MROUND(weight, rounding), reps]);
  }

  return SP_FORMAT(result);
}

function SP_SET_PERCENTS(weight, reps, set_percents, rounding) {
  if (set_percents == undefined) { set_percents = [1.0]; }

  var result = set_percents.map(function(set_percent) {
     return [SP_MROUND(weight * set_percent, rounding), reps];
  });

  return SP_FORMAT(result);
}

function SP_SET_PERCENTS_AND_REPS(weight, set_percents_and_reps, rounding) {
  var result = set_percents_and_reps.map(function(set) {
    return [SP_MROUND(weight * set[0], rounding), set[1]]
  });
  return SP_FORMAT(result);
}

function SP_531(weight, week, rounding, fsl) {
  var weeks = {
    1: [[0.65, 5], [0.75, 5], [0.85, "5+"]],
    2: [[0.70, 3], [0.80, 3], [0.90, "3+"]],
    3: [[0.75, 5], [0.85, 3], [0.95, "1+"]]
  };

  var set_percents_and_reps = weeks[week];

  if (fsl == "+") {
    set_percents_and_reps.push([
      set_percents_and_reps[0][0],
      set_percents_and_reps[0][1] + "+"]
    );
  } else if (fsl != undefined) {
    for(i = 0; i < 3; i++) {
      set_percents_and_reps.push([
        set_percents_and_reps[0][0],
        fsl
      ]);
    }
  }

  return SP_SET_PERCENTS_AND_REPS(weight, weeks[week], rounding);
}

function SP_HEAVY_BACKDOWNS(weight, reps, backdown_sets, backdown_percentage, rounding) {
  if (backdown_sets == undefined) { backdown_sets = 1; }
  if (backdown_percentage == undefined) { backdown_percentage = 0.9; }

  var set_percents = [1.0];
  for(i = 0; i < backdown_sets; i++) {
    set_percents.push(backdown_percentage);
  }

  return SP_SET_PERCENTS(weight, reps, set_percents, rounding);
}

function SP_FORMAT(sets) {
  return sets.map(function(set) {
    var weight = set[0];
    var reps = set[1];

    return weight + " x " + reps;
  });
}

function SP_MROUND(number, multiple){
  if (multiple === undefined) { multiple = 1; }

  return Math.round(number / multiple) * multiple;
}
