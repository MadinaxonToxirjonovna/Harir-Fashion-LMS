# Harir Fashion LMS — Automatic Vercel Deploy Watcher
# Watches src/, public/, and index.html and automatically deploys to Vercel on any edit.

$projectPath = "C:\Users\user\Desktop\PDP University\Projects\Harir Fashion LMS"
$nodeDir = "$env:USERPROFILE\.tools\nodejs\node-v22.14.0-win-x64"
$env:PATH = "$nodeDir;$env:PATH"

Set-Location $projectPath

$watchPaths = @(
    (Join-Path $projectPath "src"),
    (Join-Path $projectPath "public")
)

$watchers = @()
$script:lastChange = [DateTime]::MinValue
$script:pendingDeploy = $false

$onChange = {
    $script:lastChange = Get-Date
    $script:pendingDeploy = $true
}

foreach ($p in $watchPaths) {
    if (Test-Path $p) {
        $fsw = New-Object System.IO.FileSystemWatcher
        $fsw.Path = $p
        $fsw.IncludeSubdirectories = $true
        $fsw.EnableRaisingEvents = $true
        $fsw.NotifyFilter = [System.IO.NotifyFilters]'LastWrite, FileName, DirectoryName'
        Register-ObjectEvent $fsw Changed -Action $onChange | Out-Null
        Register-ObjectEvent $fsw Created -Action $onChange | Out-Null
        Register-ObjectEvent $fsw Deleted -Action $onChange | Out-Null
        Register-ObjectEvent $fsw Renamed -Action $onChange | Out-Null
        $watchers += $fsw
    }
}

# Also watch index.html in root
$rootWatcher = New-Object System.IO.FileSystemWatcher
$rootWatcher.Path = $projectPath
$rootWatcher.Filter = "index.html"
$rootWatcher.IncludeSubdirectories = $false
$rootWatcher.EnableRaisingEvents = $true
$rootWatcher.NotifyFilter = [System.IO.NotifyFilters]'LastWrite'
Register-ObjectEvent $rootWatcher Changed -Action $onChange | Out-Null
$watchers += $rootWatcher

Write-Output "AUTO_DEPLOY_WATCHER_STARTED: Watching src/, public/, index.html -> Vercel (--prod)"

try {
    while ($true) {
        Start-Sleep -Seconds 2
        if ($script:pendingDeploy -and ((Get-Date) - $script:lastChange).TotalSeconds -ge 5) {
            $script:pendingDeploy = $false
            Write-Output "[$(Get-Date -Format 'HH:mm:ss')] O'zgarish aniqlandi! Vercel ga avtomatik yuklanmoqda..."
            & "$nodeDir\vercel.cmd" --prod --yes
            Write-Output "[$(Get-Date -Format 'HH:mm:ss')] Vercel yangilandi!"
        }
    }
} finally {
    foreach ($w in $watchers) {
        $w.EnableRaisingEvents = $false
        $w.Dispose()
    }
}
