alias a := astro
alias d := dev
alias r := dev
alias b := build
alias p := preview
alias l := lint
alias lw := lint-write
alias lf := lint-fix
alias i := install


npm := "pnpm"


default:
    just --list


install *PARAMS:
    {{npm}} install {{PARAMS}}


astro *PARAMS:
    {{npm}} run astro {{PARAMS}}


dev *PARAMS: (astro "dev" PARAMS)


build *PARAMS: (astro "build" PARAMS)


preview *PARAMS: (astro "preview" PARAMS)


lint *PARAMS:
    just prettier {{PARAMS}}
    just eslint {{PARAMS}}


lint-fix *PARAMS:
    just lint-write {{PARAMS}}


lint-write *PARAMS:
    just prettier {{PARAMS}} "--write"
    just eslint {{PARAMS}} "--fix"


prettier *PARAMS:
    {{npm}} exec prettier -c . {{PARAMS}}


eslint *PARAMS:
    {{npm}} exec eslint ./src {{PARAMS}}
