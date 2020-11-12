/*
Language: jcl
Description: 
Contributors: 
Category: 
Website: 
*/

function jcl(hljs) {
  var PLANET_MODE = hljs.COMMENT('^#@PLANET', '$',{className: 'planet-comment'});
  var COMMENT_MODE = hljs.COMMENT('^//\\*', '$');
  return {
    name: 'jcl',
    case_insensitive: true,
    illegal: /[<>{}*]/,
    contains: [
      {
        endsWithParent: true,
        keywords: {
          $pattern: '[A-Z_][A-Z0-9_.]*',
          keyword:
            'DD DSN DSNAME DUMMY EXEC JOB PEND PGM PROC SYSOUT AMP BLKSIZE CATLG DISP DATA',
          literal: 
            'YES NO SHR'
        },
        contains: [
          {
            className: 'string',
            begin: '\'', end: '\'',
            contains: [{begin: '\'\''}]
          },
          {
            className: 'string',
            begin: '"', end: '"',
            contains: [{begin: '""'}]
          },
          hljs.NUMBER_MODE,
          COMMENT_MODE,
          PLANET_MODE
        ]
      }
    ]
  };
}

module.exports = jcl;
