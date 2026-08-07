# Script para inserir os 4 novos depoimentos (Gracielle, Veronica, Rafael, Vinicius)
# na secao "O que profissionais reais estao sentindo" do index.html da Pagina de Vendas.
# Rode este script DENTRO da pasta do repo, ao lado do index.html.

$path = Join-Path $PSScriptRoot "index.html"

if (-not (Test-Path $path)) {
    Write-Host "ERRO: nao encontrei index.html nesta pasta. Confere se o script esta na mesma pasta do arquivo." -ForegroundColor Red
    exit 1
}

$content = Get-Content -Path $path -Raw -Encoding UTF8

$find = '&mdash; Whisney, Profissional de TI</p></div></div></div></section></div><div id="conteudo-4"'

if ($content -notmatch [regex]::Escape($find)) {
    Write-Host "ERRO: nao encontrei o trecho esperado (depoimento do Whisney) no arquivo. Nada foi alterado." -ForegroundColor Red
    exit 1
}

$novosCards = @'
&mdash; Whisney, Profissional de TI</p></div><div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:16px;padding:22px 24px;box-shadow:0 8px 20px rgba(0,0,0,0.04)"><p style="font-size:17px;line-height:1.55;font-style:italic;margin:0 0 10px;color:#1f1d1a">&ldquo;O diagn&oacute;stico me fez refletir sobre como me comporto. Os planos de navega&ccedil;&atilde;o d&atilde;o uma orienta&ccedil;&atilde;o direta, f&aacute;cil de executar.&rdquo;</p><p style="font-size:13px;font-weight:700;color:#5f5750;margin:0">&mdash; Gerente de Inova&ccedil;&atilde;o, empresa p&uacute;blica</p></div><div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:16px;padding:22px 24px;box-shadow:0 8px 20px rgba(0,0,0,0.04)"><p style="font-size:17px;line-height:1.55;font-style:italic;margin:0 0 10px;color:#1f1d1a">&ldquo;97,00 n&atilde;o &eacute; barato, mas tamb&eacute;m n&atilde;o &eacute; caro &mdash; &eacute; acess&iacute;vel. O material &eacute; diferente do gratuito, &eacute; mais profundo. Aprendi que conhecimento tem pre&ccedil;o sim, e d&aacute; seguran&ccedil;a a quem compra.&rdquo;</p><p style="font-size:13px;font-weight:700;color:#5f5750;margin:0">&mdash; Servidora cedida</p></div><div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:16px;padding:22px 24px;box-shadow:0 8px 20px rgba(0,0,0,0.04)"><p style="font-size:17px;line-height:1.55;font-style:italic;margin:0 0 10px;color:#1f1d1a">&ldquo;O diagn&oacute;stico foi muito bom, bem interessante &mdash; as perguntas iam desde como estava meu LinkedIn at&eacute; se eu buscava novas oportunidades. Respondi tanto como servidor da UnB quanto como professor da iniciativa privada, e o resultado foi satisfat&oacute;rio.&rdquo;</p><p style="font-size:13px;font-weight:700;color:#5f5750;margin:0">&mdash; Rafael, Professor Universit&aacute;rio</p></div><div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:16px;padding:22px 24px;box-shadow:0 8px 20px rgba(0,0,0,0.04)"><p style="font-size:17px;line-height:1.55;font-style:italic;margin:0 0 10px;color:#1f1d1a">&ldquo;O que eu consegui fazer no GPS fez muito sentido pra mim &mdash; &eacute; uma ferramenta &uacute;til tanto pra quem est&aacute; come&ccedil;ando quanto pra quem j&aacute; &eacute; mais consolidado na carreira. De grande valor, bem inspiradora. Se eu tivesse os 97 reais, pagaria sem pensar duas vezes &mdash; vale muito a pena.&rdquo;</p><p style="font-size:13px;font-weight:700;color:#5f5750;margin:0">&mdash; Vinicius, Jovem comerci&aacute;rio</p></div></div></div></section></div><div id="conteudo-4"
'@

$content = $content.Replace($find, $novosCards)

Set-Content -Path $path -Value $content -NoNewline -Encoding UTF8

Write-Host "Pronto! 4 depoimentos novos inseridos (Gracielle, Veronica, Rafael, Vinicius)." -ForegroundColor Green
Write-Host "Confere o resultado abrindo o index.html no navegador antes de commitar." -ForegroundColor Yellow